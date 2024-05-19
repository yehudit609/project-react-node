import React, { useState } from 'react';
import validator from 'validator';
import './FormStyle.css'; // נניח שיש לך קובץ CSS כזה

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'שם פרטי נדרש';
    if (!formData.lastName) errors.lastName = 'שם משפחה נדרש';
    if (!validator.isMobilePhone(formData.phone)) errors.phone = 'מספר טלפון לא תקין';
    if (!validator.isEmail(formData.email)) errors.email = 'כתובת מייל לא תקינה';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      // כאן אתה יכול להוסיף לוגיקה לשליחת הטופס לשרת או להתמודד עם הנתונים באופן אחר
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="שם פרטי"
        className={formErrors.firstName ? 'error' : ''}
      />
      {formErrors.firstName && <p className="error-msg">{formErrors.firstName}</p>}

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="שם משפחה"
        className={formErrors.lastName ? 'error' : ''}
      />
      {formErrors.lastName && <p className="error-msg">{formErrors.lastName}</p>}

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="טלפון"
        className={formErrors.phone ? 'error' : ''}
      />
      {formErrors.phone && <p className="error-msg">{formErrors.phone}</p>}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="מייל"
        className={formErrors.email ? 'error' : ''}
      />
      {formErrors.email && <p className="error-msg">{formErrors.email}</p>}

      <button type="submit">שלח</button>
    </form>
  );
}

export default ContactForm;
 