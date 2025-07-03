import { format } from 'date-fns'
import { BookOpenTextIcon, SparklesIcon, FileTextIcon, FileVideoIcon, ClockFadingIcon } from 'lucide-react'
import Link from 'next/link'
import Markdown from 'react-markdown'

import { formatDuration } from '@/lib/utils'

import { GeneratedAvatar } from '@/components/generated-avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MeetingGetOne } from '@/modules/meetings/types'

interface Props {
  data: MeetingGetOne
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-between rounded-none h-13">
              <TabsTriggerWrapper value="summary">
                <BookOpenTextIcon />
                Summary
              </TabsTriggerWrapper>
              <TabsTriggerWrapper value="transcript">
                <FileTextIcon />
                Transcript
              </TabsTriggerWrapper>
              <TabsTriggerWrapper value="recording">
                <FileVideoIcon />
                Recording
              </TabsTriggerWrapper>
              <TabsTriggerWrapper value="chat">
                <SparklesIcon />
                Ask AI
              </TabsTriggerWrapper>
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-4 py-5">
            <video src={data.recordingUrl!} className="w-full rounded-lg" controls />
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="bg-white rounded-lg border">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>

              <div className="flex items-center gap-x-2">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                >
                  <GeneratedAvatar variant="botttsNeutral" seed={data.agent.name} className="size-5" />

                  {data.agent.name}
                </Link>

                <p>{data.startedAt ? format(data.startedAt, 'PPP') : undefined}</p>
              </div>

              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>

              <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
                <ClockFadingIcon className="text-blue-700" />
                {data.duration ? formatDuration(data.duration) : 'No duration'}
              </Badge>

              <div>
                <Markdown
                  components={{
                    h1: (props) => <h1 className="text-2xl font-medium md-6" {...props} />,
                    h2: (props) => <h2 className="text-xl font-medium md-6" {...props} />,
                    h3: (props) => <h3 className="text-lg font-medium md-6" {...props} />,
                    h4: (props) => <h4 className="text-base font-medium md-6" {...props} />,
                    p: (props) => <p className="leading-relaxed md-6" {...props} />,
                    ul: (props) => <ul className="list-disc list-inside md-6" {...props} />,
                    ol: (props) => <ol className="list-decimal list-inside md-6" {...props} />,
                    li: (props) => <li className="mb-1" {...props} />,
                    strong: (props) => <strong className="font-semibold" {...props} />,
                    code: (props) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
                    blockquote: (props) => <blockquote className="border-l-4 pl-4 italic my-4" {...props} />,
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const TabsTriggerWrapper = ({ children, value }: { children: React.ReactNode; value: string }) => (
  <TabsTrigger
    value={value}
    className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
  >
    {children}
  </TabsTrigger>
)
