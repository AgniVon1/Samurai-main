import React from 'react';
import {Post} from "./Posts/Post";
import {ProfilePageType} from "../../../redux/profile-reducer";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";


export type MyPostsPropsType = {
    profilePage: ProfilePageType,
    addPost: (newPost:string) => void,
}

export const MyPosts: React.FC<MyPostsPropsType> = ({
                                                        profilePage:
                                                            {
                                                                posts: posts,
                                                            },
                                                        addPost,

                                                    }) => {
    const mappedPosts = posts.map((p) => <Post  key = {p.id} id={p.id} likeCounts={p.likeCounts} message={p.message}/>)

    const addNewPost = (formData: AddPostFormValuesType) => {
        addPost(formData.newPost)
    }
    return (
        <div>
          <AddPostForm onSubmit = {addNewPost}/>
            {mappedPosts}
        </div>
    );
};

