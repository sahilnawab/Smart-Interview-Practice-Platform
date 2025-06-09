import { Register } from "../features/auth/components/Register"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Register/>
      </div>
    </div>
  )
}
