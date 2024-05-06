import React from 'react';
import { auth, firebase, firestore } from '../firebase/firebase';
const Login = () => {

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      // Google ile kayıt et
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
  
      // Bu yeni bir kullanıcı mı yoksa hali hazırda kayıtlı bir kullanıcı mı kontrol et
      const userRef = firestore.collection('users').doc(user.uid);
      const userDoc = await userRef.get();
      const browserInfo = navigator.userAgent; // Tarayıcı bilgilerini al

      if (!userDoc.exists) {
        // Eğer yeni kullanıcı ise bilgilerini veri tabanına kaydet
        await userRef.set({
          displayName: user.displayName,
          email: user.email,
          userId: user.uid,
          browserInfo: browserInfo
          // buraya geri kalan bilgileri ekleyebilirsin
        });
      }
  
      //Kullanıcı giriş yaptığında

    } catch (error) {
      console.error(error.message);
      // Hata çıkarsa hatayı göster
    }
  };
  return (
      <button style={{color:"white"}}  className='btn'onClick={handleSignInWithGoogle}>
       <h3>Google ile devam et</h3> 
      </button>

  );
};

export default Login;
