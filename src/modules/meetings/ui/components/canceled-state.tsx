import { EmptyState } from '@/components/empty-state'

export const CanceledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
      <EmptyState
        title="Meeting is canceled"
        description="This meeting was canceled"
        image="/canceled.svg"
      />
    </div>
  )
}