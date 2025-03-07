import { Bug } from 'lucide-react'

import { FormLogin } from '@/components/FormLogin'

export default function Home() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <Bug className='size-4' />
            </div>
            bugzb4di
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <FormLogin />
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img src='/auth.jpg' alt='Image' className='absolute inset-0 h-full w-full object-fill' />
      </div>
    </div>
  )
}
