import { Dialog } from '@headlessui/react'
import React from 'react'

export const EditUser = ({ isOpen, setIsOpen, username, setUsername, setPassword, image, setImage, handlerSubmit }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
          <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
            <Dialog.Title className='text-sky-800'>Редактирование</Dialog.Title>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className='text-xs text-gray-400'>
                  Ваше имя:
                  <input
                    type='text'
                    placeholder='имя'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700`}>
                  </input>
                </label>
              </div>
              <label className='text-xs text-gray-400'>
                Новый пароль:
                <input
                  type='password'
                  placeholder='пароль'
                  onChange={(e) => setPassword(e.target.value)}
                  className={`my-2 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700`}>
                </input>
              </label>
              <label className="flex justify-center items-center text-gray-300 py-2 bg-gray-600 text-xs my-4 border-2 border-dotted cursor-pointer">
                Изменить фото
                <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
              </label>
              {/* отображение выбранной картинки перед отправкой*/}
              <div className="flex justify-center items-center object-cover py-2">
                {image && <img src={URL.createObjectURL(image)} alt={image.name} className='h-20' />}
              </div>
              <div className='flex justify-center mt-4'>
                <button
                  onClick={handlerSubmit}
                  className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300">
                  Сохранить
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
