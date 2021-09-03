import { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

function useWindowWidth(delay = 500) {
  const [width, setWidth] = useState(window.innerWidth || window.screen.width)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth || window.screen.width)
    const debouncedHandleResize = debounce(handleResize, delay)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [delay])

  return width
}

export default useWindowWidth
