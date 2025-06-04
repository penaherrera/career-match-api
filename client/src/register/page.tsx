import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from '@/components/register-form'

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen min-w-screen lg:grid-cols-2">
      <div className="flex flex-col items-center p-8 lg:items-start lg:px-12">
        <div className="mb-8">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
              <GalleryVerticalEnd className="h-4 w-4" />
            </div>
            <span className="font-medium">Acme Inc.</span>
          </a>
        </div>
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="w-full max-w-[350px]">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/news-sas.jpg"
          alt="News background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
