import { createFileRoute } from '@tanstack/react-router'
import { Invites } from '@modules/Invites'

export const Route = createFileRoute('/invites')({
  component: () => <Invites />,
})
