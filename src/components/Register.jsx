import React, {useState} from 'react'
import "./register.css"
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'




const Register = () => {

  const { register, handleSubmit } = useForm();

  // variabel validasi
  const [errors, setErrors] = useState({});

  const onSubmit = ({ firstName, lastName, email, password, check }) => {
    let newErrors = {};

    if (!firstName.length)
      newErrors ={
          ...newErrors,firstName: ["nama awal harus diisi"],
          
      };
      

    if (!lastName.length)
      newErrors = {
          ...newErrors,lastName: ["nama akhir harus diisi"],
      }
    // cek email required
    if (!email.length)
      newErrors = {
        ...newErrors,email: ["email harus diisi"],
      };

    // cek email valid
    if (!email.includes("@"))
      newErrors = {
        ...newErrors,email: [...(newErrors?.email ?? []), "email tidak valid"],
      };

    // cek password required & panjang tulisan 8 huruf
    if (password.length < 8)
      newErrors = {
        ...newErrors,
        password: [
          ...(newErrors?.password ?? []),
          "minimal 8 karakter",
        ],
      };

    // cek centang
    if (!check)
      newErrors = {
          ...newErrors,check: ["harus dicentang"],
      };

    // tampilkan di console jika invalid
    console.log({
      status: Object.keys(newErrors).length ? 422 : 200,
      message: Object.keys(newErrors).length
        ? "terjadi kesalahan input!"
        : "Anda berhasil Login!",
      errors:newErrors,
      data:{firstName,lastName,email,password}
    });

    setErrors(newErrors);
  };

  // pop-up term and conditions
  const term=(e)=>{
      e.preventDefault();
      alert('harus dicentang!')
  }
  
    

  return (
    <div className="register-page">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create your Account</h2>
        <div className="container">
            <div>
                <label htmlFor='firstName'><b>First Name</b></label>
                <input type="text" id='firstName' {...register('firstName')}placeholder="Joko" />
                {errors?.firstName && <span>{errors.firstName.join(", ")}</span>}
            </div>
            <div>
                <label htmlFor='lastName'><b>Last Name</b></label>
                <input type="text" id='lastName' {...register('lastName')} placeholder="Shidiq" />
                {errors?.lastName && <span>{errors.lastName.join(", ")}</span>}      
            </div>
            <div>
                <label htmlFor='email'><b>Email Address</b></label>
                <input type="email" id='email' {...register('email')} placeholder="example@email.com" />
                {/* message */}
                {errors?.email && <span>{errors.email.join(", ")}</span>}
            </div>
            <div>
                <label htmlFor='password'><b>Password</b></label>
                <input type="password" id='password'{...register('password')} placeholder="Enter Password"></input>
                {/* message */}
                {errors?.password && <span>{errors.password.join(", ")}</span>}
            </div>
            <div className="check">
                <input type="checkbox" id='check' {...register('check')}/>
                <label htmlFor="checkbox"> to register with us please tick to agree to our <a onClick={term}>Terms and Conditions</a>.</label>
            </div>
            <div>
                {/* message */}
                {errors?.check && <span>{errors.check.join(", ")}</span>}
            </div>
            
                
            <button type="submit">Register</button>
        </div>
        </form>
        <div className="container">
        <p>Alredy have an account? <Link to='/'>Sign In</Link></p>
        </div> 
    </div>
  )
}

export default Register