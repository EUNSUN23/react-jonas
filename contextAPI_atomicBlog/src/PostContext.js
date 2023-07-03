// 1) context 생성
import {createContext, useState} from "react";
import {faker} from "@faker-js/faker";

export function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

// 1) Context 생성
export const PostContext = createContext(); // 컴포넌트를 반환한다.

export function PostProvider({children}) {
    const [posts, setPosts] = useState(() =>
        Array.from({length: 30}, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");


    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return (
        // 2) Provider를 통해서 value를 자식 컴포넌트들에 전달한다.
        <PostContext.Provider value={{
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPost: handleClearPosts,
            searchQuery,
            setSearchQuery
        }}>{children}</PostContext.Provider>
    )
}
