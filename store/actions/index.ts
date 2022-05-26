import * as UserActionCreators from './user'
import * as ArticlesCategoriesActionCreators from './articles-categories'

export default {
    ...UserActionCreators,
    ...ArticlesCategoriesActionCreators,
}