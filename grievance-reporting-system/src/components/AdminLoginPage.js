function AdminLogInPage() {
  const handleClick = () => {
    console.log("Button clicked!");

    // You can log other variables or state here as well
  };
  return (
    
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex items-center justify-center max-md:gap-8 max-w-md max-md:max-w-lg w-full p-4 [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
        <div className="md:max-w-md w-full px-6 py-6">
          <htmlForm>
            <div className="mb-12">
              <h1 className="flex justify-center text-slate-900 text-3xl font-bold">Enter Admin Credentials</h1>
            </div>

            <div>
              <label className="text-slate-900 text-[13px] font-medium block mb-2">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="text" required className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transhtmlForm="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-slate-900 text-[13px] font-medium block mb-2">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" required className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-blue-600 pl-2 pr-8 py-3 outline-none" placeholder="Enter password" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-sm" />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>
              <div>
                <a href="jajvascript:void(0);" className="text-blue-600 font-medium text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="mt-12">
              <button onClick={handleClick} type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                Sign in
              </button>

            </div>

            
          </htmlForm>
        </div>

        {/* <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
          <img src='favicon.ico' className="w-full aspect-[12/12] object-contain" alt="login-image" />
        </div> */}
      </div>
    </div>
  );

}

export default AdminLogInPage