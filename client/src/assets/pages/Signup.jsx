import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    fullName: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedOption) => {
    setFormData({ ...formData, role: selectedOption.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'recruitor', label: 'Recruitor' }
  ];

  const inputContainerStyle = 'relative mb-5';
  const inputStyle = 'w-full pl-10 pr-4 py-3 border border-solid border-purple-300 focus:outline-none focus:border-purple-600 text-[16px] leading-7 text-headingColor placeholder:text-gray-400 rounded-md transition-colors duration-300 ease-in-out';
  const iconStyle = 'absolute left-3 top-3 text-purple-400';

  return (
    <section className='flex items-center justify-center min-h-screen px-5 xl:px-0 bg-purple-50'>
      <div className="w-full max-w-[570px] mx-auto bg-white rounded-lg shadow-lg p-8 md:p-10">
        <div className="grid">
          <div className="rounded-l-lg lg:px-8 py-10">
            <h3 className="text-purple-800 text-[22px] leading-9 font-bold mb-10">
              Create an <span className='text-purple-600'>account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className={inputContainerStyle}>
                <FaUser className={iconStyle} />
                <input
                  type="text"
                  name="fullName"
                  placeholder='Enter your full name'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-purple-600 hover:bg-purple-50 focus:bg-purple-100`}
                  required
                />
              </div>

              <div className={inputContainerStyle}>
                <FaEnvelope className={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-purple-600 hover:bg-purple-50 focus:bg-purple-100`}
                  required
                />
              </div>

              <div className={inputContainerStyle}>
                <FaLock className={iconStyle} />
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-purple-600 hover:bg-purple-50 focus:bg-purple-100`}
                  required
                />
              </div>

              <div className={inputContainerStyle}>
                <FaPhone className={iconStyle} style={{ transform: 'scaleX(-1)' }} />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder='Enter your phone number'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-purple-600 hover:bg-purple-50 focus:bg-purple-100`}
                  required
                />
              </div>

              <div className="mb-5">
                <label className='text-purple-800 font-bold text-[16px] leading-7 mb-2'>
                  Are you a:
                </label>
                <Select
                  options={roleOptions}
                  defaultValue={roleOptions[0]}
                  onChange={handleRoleChange}
                  className='text-purple-800 font-semibold text-[15px] leading-7'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: '#A78BFA',
                      ':hover': {
                        borderColor: '#6B21A8',
                        backgroundColor: '#F3E8FF',
                      },
                      ':focus': {
                        borderColor: '#6B21A8',
                        backgroundColor: '#F3E8FF',
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#F3E8FF' : null,
                      color: state.isFocused ? '#6B21A8' : null,
                    }),
                  }}
                />
              </div>

              <div className="mt-7">
                <button
                  disabled={loading}
                  type='submit'
                  className="w-full bg-purple-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 transition-transform duration-300 ease-in-out hover:bg-purple-800 hover:scale-105"
                >
                  {loading ? <HashLoader size={35} color='#fff' /> : 'SignUp'}
                </button>
              </div>

              <p className="mt-5 text-purple-800 text-center">
                Already have an account? <Link to='/login' className='text-purple-600 font-medium ml-1 hover:underline'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;