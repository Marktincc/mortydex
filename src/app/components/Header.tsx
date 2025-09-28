import { NextPage } from 'next'

interface Props { }

const Header: NextPage<Props> = ({ }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/20 bg-background-light px-4 py-3 dark:bg-background-dark sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Explorador de Personajes</h1>
      </div>
      <button className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30" >
        <span className="material-symbols-outlined text-base">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
        </svg></span>
        Ayuda
      </button>
    </header>
  )
}

export default Header