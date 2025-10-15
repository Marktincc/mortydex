import { NextPage } from 'next'
import dynamic from 'next/dynamic';


const LoginForm = dynamic(() => import('./_components/Loginform'));

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Page: NextPage<{}> = ({ }) => {
  return (
    <>
      <div className="relative flex-grow flex items-center justify-center p-4 overflow-hidden">
        <div className="relative z-10 w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Page
