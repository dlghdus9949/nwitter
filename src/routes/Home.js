import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(()=> {
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const newArray = snapshot.docs.map((document)=>({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    },[]);


    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({ //Promise를 반환하므로 async await 사용
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on yout mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;