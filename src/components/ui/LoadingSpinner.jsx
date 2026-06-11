export default function LoadingSpinner({ size = 'md', color = 'cyan' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  const colors = {
    cyan: 'border-cyan-400',
    green: 'border-green-400',
    purple: 'border-purple-400',
    white: 'border-white',
  }
  return (
    <div
      className={`${sizes[size]} rounded-full border-2 ${colors[color]} border-t-transparent animate-spin`}
    />
  )
}
