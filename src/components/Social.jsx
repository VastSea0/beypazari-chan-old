import {React, useState, useEffect, useRef} from "react";
import Header from "./Header";
import "../styles/Zirve.css";
import { Row } from "react-bootstrap";
import { firestore, auth, firebase } from '../firebase/firebase'; // Firebase'den firestore ve auth modüllerini içe aktarın
 
const SocialPage = () => { 
    const textareaRef = useRef(null);
    const [clientScore, setClientScore] = useState(1);  
    const [user, setUser] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        // Firebase Authentication kullanarak oturum açmış olan kullanıcıyı alın
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Oturum açılmışsa, kullanıcıyı state'e kaydedin
                setUser(user);
                // Kullanıcının userScore değerini firestore'dan alın
                const userRef = firestore.collection('users').doc(user.uid);
                userRef.get().then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    setClientScore(userData.userScore);
                    setUserName(userData.displayName)
                }
                });

            } else {
                // Oturum açılmamışsa, kullanıcıyı state'ten kaldırın
                setUser(null);
            }
        });

        // Aboneliği temizleyin
        return () => unsubscribe();
    }, []); // Effect, yalnızca bir kere çalıştırılsın ve bileşenin sıfırlanmasında temizlensin

    useEffect(() => {
        // `users` koleksiyonuna erişin
        const usersRef = firestore.collection('posts');
      
        // Verileri alındığında yapılacaklar
        usersRef.get().then((querySnapshot) => {
          const users = []; // Kullanıcı verilerini tutacak dizi (mutasyonu önlemek için)
          // Her belge için kullanıcı bilgilerini işle
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            users.push({
              username: userData.displayName|| doc.id, // Kullanıcı adı (varsa) yoksa belge kimliği
              text: userData.postText || "helo",
              createdAt: userData.createdAt,
              score: userData.score,
              likes: userData.likes,
            });
          });
      
          // Toplanan kullanıcı verilerini state'e aktarın
          setUsersData(users);
        });
      
        // Bu efekt sadece bir kere çalıştırılır (bağımlılık yok)
      }, []);
    
    
    const addPost = async () => {
        const postText = textareaRef.current.value;
        if (!postText) return;
      
        // Kullanıcı bilgileri
        const displayName = userName || 'Anonim';
        const userId = user.uid;
      
        // Güncel tarihi al
        const clientDate = new Date();
        const clientTimestamp = clientDate.toLocaleString()
        const browserInfo = navigator.userAgent;
      
        // Firestore'a yeni belge ekle
        const docRef = firestore.collection('posts').doc();
        await docRef.set({
          postText,
          displayName,
          userId,
          score: clientScore,
          browserInfo: browserInfo,
          likes: 0,
          createdAt: clientTimestamp, // Güncel tarihi ekle
        });
      
        // Textarea'yı temizle
        textareaRef.current.value = '';
      };
    
    const handleLikeClick = async (postId) => {
        // Get a reference to the post document
        const docRef = firestore.collection('posts').doc(postId);
      
        try {
          // Perform an atomic increment on the likes property
          await docRef.update({ likes: firebase.firestore.FieldValue.increment(1) });
        } catch (error) {
          console.error("Error updating likes:", error);
          // Handle error (e.g., display error message to user)
        }
      };
      
    
    const sortedUsersData = usersData.sort((a, b) => b.score - a.score);
    
    return(
        <div>
        <Header></Header>
        <div className="container" >
            <h3>OpenSoda: Sosyal Toplugu</h3>
            <div className="post-form glass center">
                <div className="post-user" >
                        <h5>
                            {user ? 
                            (userName)
                            :
                            (
                                <>Anonim</>
                            )}
                        </h5>
                        <h5 className="score-text">
                            Score: {clientScore} 
                        </h5>
                </div>
                <textarea className="textarea" ref={textareaRef} />

                 
                <button className="btn-p" onClick={addPost}>Gönderini Paylaş</button>

            </div>
            <br></br>
            <div className="posts">
             
            {sortedUsersData.map((postUser) => (
                <>
                   
                    <div className="post glass">
                    <Row>
                    <div  className="post-user"  >
                        <h5>
                            {postUser.username}:
                        </h5>
                        <h5>
                            {postUser.createdAt}
                        </h5>
                        <h5 className="score-text">
                            {postUser.score}
                        </h5>
                        <h5 className="likes-text">
                            {postUser.likes}
                        </h5>
                    </div>
                    </Row>
                    <div className="post-text">
                        <p>
                           {postUser.text}
                        </p>
                    </div>
                    <div className="post-likes" >
                       <button className="btn-like">
                        Yorum Yap
                       </button>
                       <button className="btn-like" onClick={() => handleLikeClick(postUser.uid)}>
                        Begen
                        </button>

                    </div>
                </div>
                <br></br>
                </>
            ))}
            </div>
        </div>
        </div>
    )
}

export default SocialPage;
