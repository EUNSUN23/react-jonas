// 1) context 생성
import {createContext, useContext, useMemo, useState} from "react";
import {faker} from "@faker-js/faker";

export function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

// 1) Context 생성
// createContext에 defaultValue를 넘겨줄 수 있지만 defaultvalue에서 다른 값으로 변경이 불가능하기때문에 거의 사용하지 않는다.
// 따라서 null을 넘기거나 보통은 빈 상태로 둔다.
export const PostContext = createContext(); // 컴포넌트(context)를 반환한다.

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

    // context 성능최적화
    const value = useMemo(function () {
        return {
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPost: handleClearPosts,
            searchQuery,
            setSearchQuery
        }
    },[searchedPosts,searchQuery]);

    return (
        // 2) Context Provider를 통해서 value를 자식 컴포넌트들에 전달한다.
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    )
}

export function usePosts() {
    const context = useContext(PostContext);
    if(context === undefined) throw new Error("PostContext was used outside of the PostProvider");
    return context;
}