'use client'

import { useEffect, useState } from 'react'

import { Call, CallingState, StreamVideo, StreamCall, StreamVideoClient } from '@stream-io/video-react-sdk'
import { useMutation } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'

import { CallUI } from '@/modules/call/ui/components/call-ui'
import { useTRPC } from '@/trpc/client'

import '@stream-io/video-react-sdk/dist/css/styles.css'

interface Props {
  meetingId: string
  meetingName: string
  userId: string
  userName: string
  userImage: string
}

export const CallConnect = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
  const trpc = useTRPC()
  const { mutateAsync: generateVideoToken } = useMutation(trpc.meetings.generateVideoToken.mutationOptions({}))

  const [client, setClient] = useState<StreamVideoClient>()

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateVideoToken,
    })

    setClient(_client)

    return () => {
      _client.disconnectUser()
      setClient(undefined)
    }
  }, [userId, userName, userImage, generateVideoToken])

  const [call, setCall] = useState<Call>()

  useEffect(() => {
    if (!client) return

    const _call = client.call('default', meetingId)
    _call.camera.disable()
    _call.microphone.disable()

    setCall(_call)

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave()
        _call.endCall()
        setCall(undefined)
      }
    }
  }, [client, meetingId])

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon />
      </div>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={ meetingName } />
      </StreamCall>
    </StreamVideo>
  )
}
