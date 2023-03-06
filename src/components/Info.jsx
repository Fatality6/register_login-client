import { Dialog } from '@headlessui/react'
import moment from 'moment'
import React from 'react'
import noPhoto from '../common/img/user.jpg'

const Info = ({isOpen, setIsOpen, activeName, activeBirthdate, activeImage}) => {

    const formattedBirth = moment(activeBirthdate).format("YYYY-MM-DD")
    const birthdate = new Date(formattedBirth)
    const ageInMs = Date.now() - birthdate.getTime()
    const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365))

    return (
        <div><Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                    <Dialog.Title className='text-sky-800 text-[30px]'>{activeName}</Dialog.Title>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <img 
                                src={activeImage?`https://register-login-server.onrender.com/${activeImage}`:noPhoto}
                                className='w-[350px]' 
                                alt="1" />
                        </div>
                        <div className='text-gray-600'>Возраст: {ageInYears} лет</div>
                        
                        <div className='flex justify-center mt-4'>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300">
                                Закрыть
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
        </div>
    )
}

export default Info