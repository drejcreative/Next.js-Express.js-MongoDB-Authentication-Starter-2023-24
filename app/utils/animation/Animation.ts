export const container = {
  hidden: {
    opacity: 0,
    y: 60
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
}

export const item = {
  hidden: {
    opacity: 0,
    x: 100
  },
  show: {
    opacity: 1,
    x: 0
  }
}