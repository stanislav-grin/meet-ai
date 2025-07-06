import { Suspense } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'

import { auth } from '@/lib/auth'

import { UpgradeView, UpgradeViewError, UpgradeViewLoading } from '@/modules/upgrade/ui/views/upgrade-view'
import { getQueryClient, trpc} from '@/trpc/server'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  )

  void queryClient.prefetchQuery(
    trpc.premium.getProducts.queryOptions(),
  )

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <Suspense fallback={ <UpgradeViewLoading/> }>
        <ErrorBoundary fallback={ <UpgradeViewError/> }>
          <UpgradeView/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}