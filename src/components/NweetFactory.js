import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { useState } from "react";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); //storage의 이미지 폴더 생성
            const response = await attachmentRef.putString(attachment, "data_url"); //폴더에 이미지 넣는 작업
            attachmentUrl = await response.ref.getDownloadURL();
        }

    // await dbService.collection("nweets").add({ //Promise를 반환하므로 async await 사용
    //     text: nweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //     attachmentUrl,
    // });
    // setNweet("");   //state 비워서 form 비우기
    // setAttachment("");  //파일 미리보기 img src 비우기

    const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
        };
        
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
};

const onChange = (event) => {
    event.preventDefault();
    const {
        target: { value },
    } = event;
    setNweet(value);
};

const onFileChange = (event) => {
    const {
        target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    };
    //reader.readAsDataURL(theFile);
    if (theFile) {
        reader.readAsDataURL(theFile);
    }
};

const onClearAttachment = () => {setAttachment("")};

    return(
        <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on yout mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="img"/>
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
    );
};

export default NweetFactory;