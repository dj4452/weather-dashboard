interface Props {
  message: string
}

const ErrorMessage = ({ message }: Props) => (
  <div className="bg-red-950 border border-red-800 text-red-300
                  rounded-xl px-4 py-3 text-sm flex items-center gap-2">
    <span>⚠️</span>
    <span>{message}</span>
  </div>
)

export default ErrorMessage