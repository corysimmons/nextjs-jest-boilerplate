// https://github.com/vercel/next.js/discussions/17443#discussioncomment-739583
import { useEffect, useRef } from "react"
import { useUpdate } from "react-use"

export default function useMounted() {
  const mounted = useRef(false)
  const update = useUpdate()
  useEffect(() => {
    if (mounted.current == false) {
      mounted.current = true
      update()
    }
  }, [update])
  return mounted.current
}