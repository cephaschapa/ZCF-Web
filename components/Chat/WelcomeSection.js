import WelcomeBtn from './WelcomeBtn'
import {ChatIcon, UserGroupIcon, UserAddIcon, SearchIcon, LockClosedIcon} from '@heroicons/react/solid'
import {useState} from 'react'
import { ClipboardCopyIcon } from '@heroicons/react/outline'
import Suggestions from './Suggestions'

function WelcomeSection() {
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [isPrivate, setIsprivate] = useState(false)
    return (
        <div className="flex flex-col items-center w-full h-screen pt-96">
            <h1 className="text-4xl text-gray-500 font-bold mb-10">ZCF Messenger</h1>
            <div className="flex space-x-5">
            {/* Center Icons */}
            <button onClick={() => {
                setShowModal1(true);
            }} type="button" className="flex flex-col items-center space-y-3 bg-gradient-to-r  p-3 text-white rounded-2xl bg-[#198A00] transition duration-150 transform hover:bg-[#26970c]">
               <p><ChatIcon className="h-12" /></p>
               <p>Begin Chatting</p>
            </button>
            <button onClick={() => {
                setShowModal2(true)
            }} type="button" className="flex flex-col items-center space-y-3 bg-gradient-to-r  p-3 text-white rounded-2xl bg-[#198A00] transition duration-150 transform hover:bg-[#26970c]">
               <p><UserGroupIcon className="h-12" /></p>
               <p>Discover Groups</p>
            </button>
            <button onClick={() => {
                setShowModal3(true);
            }} type="button" className="flex flex-col items-center space-y-3 bg-gradient-to-r  p-3 text-white rounded-2xl bg-[#198A00] transition duration-150 transform hover:bg-[#26970c]">
               <p><UserAddIcon className="h-12" /></p>
               <p>Greate a group</p>
            </button>
            </div>
            {/* Modals */}
            {/* Modal 1 */}

            {
                showModal1 ? (
                    <>
                    <div
                      className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      <div className="relative my-6 mx-auto w-5/12">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-auto overflow-auto text-sm">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-xl font-semibold text-[#198A00]">
                              Search For People
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal1(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <LockClosedIcon className="text-[#198A00] h-8" />
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="">Begin a new conversation with someone by entering their username or email.</p>
                            <div className="my-4 text-blueGray-500  leading-relaxed">
                              <form className="">
                                  <div className="flex text-lg">
                                    <input type="text" className="flex flex-grow bg-gray-100 p-2 mr-2 rounded-2xl focus:outline-none"/>
                                    <button type="submit" className="flex flex-row justify-center rounded-2xl bg-[#198A00] w-10 text-white items-center"><SearchIcon className="h-6"/></button>
                                  </div>
                              </form>
                              <div className="flex flex-col">
                                <p className="mt-10">Suggestions</p>
                                <Suggestions name="Kampamba Kapah"/>
                                <Suggestions name="Bright Kapah"/>
                                <Suggestions name="Cephas Kapah"/>
                              </div>
                              <p className="mt-10 mb-2">Or send an invitation link</p>
                              <div className="flex border border-[#198A00] w-full p-2">
                                  
                                  <input disabled className="flex flex-grow" value="https://zcf.messenger.com/#/@iamcephas:zcf.messenger.org"/>
                                  <ClipboardCopyIcon className="h-6 cursor-pointer text-[#198A00]" title="Copy to clipboard" onClick={() => alert('Link copied to clipboard')}/>
                                
                              </div>
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="bg-[#198A00] font-bold uppercase px-6 py-3 rounded-2xl text-white text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
                            >
                              Close
                            </button>
                            {/* <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
                            >
                              Save Changes
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null
            }
            {/* Modal 2 */}
            {
                showModal2 ? (
                    <>
                    <div
                      className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      <div className="relative my-6 mx-auto w-5/12">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-auto overflow-auto text-sm">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-xl font-semibold text-[#198A00]">
                              Discover Groups
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal2(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <LockClosedIcon className="text-[#198A00] h-8" />
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="font-bold">Join a group by searching for it. If you cannot find it in results ask for an invite.</p>
                            <div className="my-4 text-blueGray-500  leading-relaxed">
                              <form className="">
                                  <div className="flex text-lg">
                                    <input type="text" className="flex flex-grow bg-gray-100 p-2 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="Enter group name i.e. The Montley Crew"/>
                                    <button type="submit" className="flex flex-row justify-center rounded-2xl bg-[#198A00] w-10 text-white items-center"><SearchIcon className="h-6"/></button>
                                  </div>
                              </form>
                              <div className="flex flex-col">
                                <p className="mt-10 font-bold">Public Groups</p>
                                <Suggestions name="Home Brewery"/>
                                <Suggestions name="Farm Retreats"/>
                                <Suggestions name="Ama sample lsk"/>
                              </div>
                              
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="bg-[#198A00] font-bold uppercase px-6 py-3 rounded-2xl text-white text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal2(false)}
                            >
                              Close
                            </button>
                            {/* <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
                            >
                              Save Changes
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null
            }
            {/* Modal 3 */}
            {
                showModal3 ? (
                    <>
                    <div
                      className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      <div className="relative my-6 mx-auto w-5/12">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-auto overflow-auto text-sm">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-xl font-semibold text-[#198A00]">
                              Create a group
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal3(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <LockClosedIcon className="text-[#198A00] h-8" />
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="text-[#198A00] font-bold text-base">A group can be made puplic of private.</p>
                            <div className="my-4 text-blueGray-500  leading-relaxed">
                              <form className="text-gray-700">
                                  <div className="flex text-lg">
                                    <input type="text" className="flex flex-grow bg-gray-100 p-3 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="Group Name"/>
                                    <input type="text" className="flex flex-grow bg-gray-100 p-3 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="Topic"/>
                                  </div>
                                  <div className="flex mt-4">
                                    <div className="flex flex-col w-3/4">
                                      <p className="font-bold text-[#198A00]">Is this room public?</p>
                                      Public rooms can be found by anyone. Private rooms can only be accessed when invited.
                                    </div>
                                    
                                    <div className="flex flex-col w-1/4 items-end mt-0 ">
                                      <p className="font-bold text-[#198A00]">Option</p>
                                      <div className="flex space-x-3 transition duration-150 ease-in-out">
                                      <p id="opt-val">No</p>
                                      <input onChange={
                                        () =>{
                                          // alert(isPrivate)
                                          if(isPrivate == true){
                                            setIsprivate(false)
                                            document.getElementById('opt-val').innerHTML = "No"
                                          }
                                          else{
                                            setIsprivate(true)
                                            document.getElementById('opt-val').innerHTML = "Yes"
                                          }
                                        }
                                      } type="checkbox" class="form-checkbox h-6 w-6 checked:bg-[#198A00] border-2 border-[#198A00] checked:border-[#198A00]"/>
                                      
                                      </div>
                                    </div>
                                  </div>
                                  <div className= {`${isPrivate == false ? "block": "hidden"} flex mt-4`}>
                                    <div className="flex flex-col w-3/4">
                                      <p className="font-bold text-[#198A00]">Enable End to end encryption?</p>
                                      When you enable end to end encryption only you and this group will be able to read the messages.
                                    </div>
                                    
                                    <div className="flex flex-col w-1/4 items-end mt-2 ">
                                      <input type="checkbox" class="form-checkbox h-6 w-6 checked:bg-[#198A00] border-2 border-[#198A00] checked:border-[#198A00]"/>
                                    </div>

                                  </div>
                                  <div className= {`${isPrivate == true ? "block": "hidden"} flex mt-4`}>
                                    <div className="flex flex-col w-3/4">
                                      <p className="font-bold text-[#198A00]">Enter room address.</p>
                                      <input type="text" class="flex flex-grow bg-gray-100 p-3 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="the-group"/>
                                    </div>
                              
                                  </div>
                                  <button className="bg-[#198A00] mt-5 p-3 rounded-2xl text-white">CREATE GROUP</button>
                              </form>
                              
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="bg-[#198A00] font-bold uppercase px-6 py-3 rounded-2xl text-white text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal3(false)}
                            >
                              Close
                            </button>
                            {/* <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
                            >
                              Save Changes
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null
            }
        </div>
    )
}

export default WelcomeSection
