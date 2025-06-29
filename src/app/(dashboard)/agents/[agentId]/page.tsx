import { Suspense } from 'react'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { AgentIdView, AgentIdViewLoading, AgentIdViewError } from '@/modules/agents/ui/views/agent-id-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface Props {
  params: Promise<{ agentId: string }>
}

export default async function Page({ params }: Props) {
  const { agentId } = await params
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdViewLoading/>}>
        <ErrorBoundary fallback={<AgentIdViewError/>}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}
