'use client'
import { useSuspenseQuery } from '@tanstack/react-query'

import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { columns } from '@/modules/agents/ui/components/columns'
import { DataTable } from '@/modules/agents/ui/components/data-table'
import { useTRPC } from '@/trpc/client'

export const AgentsView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div className="flex flex-col flex-1 pb-4 px-4 md:px-8 gap-y-4">
      {data.length === 0 ? (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}

export const AgentsViewLoading = () => {
  return <LoadingState title="Loading Agents" description="It may take a few seconds..." />
}

export const AgentsViewError = () => {
  return <ErrorState title="Error loading Agents" description="Please try again later" />
}
