export default {
    getArticlesByDate: (date) => `/api/stream/date/${date}`,
    getArticlesByColumn: (columnId) => `/api/column/${columnId}/posts?count=20`,    
    getColumns: () => '/api/columns',
    getRecAuthors: () => '/api/auth_authors/rec',
    getHotAuthors: () => '/api/auth_authors/all?count=20',
    getArticleDetail: postId => `/api/post/${postId}`,
    getArticleComments: postId => `/api/post/${postId}/popular_comments`,
    getAuthorPosts: authorId => `/api/author/${authorId}/posts`,
}