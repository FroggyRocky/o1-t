import { createFileRoute } from '@tanstack/react-router'
import {Home} from "@modules/Home";

export const Route = createFileRoute('/')({
  component: Home,
})

function HomePage() {
  return <Home />
}
