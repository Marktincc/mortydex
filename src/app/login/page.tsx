import { NextPage } from 'next'
import LoginForm from './components/Loginform'
import Header from '../components/Header'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  return (
    <>
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Page