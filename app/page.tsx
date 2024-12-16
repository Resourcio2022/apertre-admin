import { Button } from "@/components/ui/button";
import Link from "next/link";

interface List {
  name: string;
  url: string;
}

const LISTS: List[] = [
  { name: 'Evangelist', url: '/evangelists' },
  { name: 'Community Partners', url: '/community-partners' }
]

export default function page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-4 bg-slate-950">
      {LISTS.map((list, idx) => (
        <Link href={list.url} key={idx}>
          <Button variant="secondary">
            {list.name}
          </Button>
        </Link>
      ))}
    </div >
  )
}
