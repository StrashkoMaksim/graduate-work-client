import * as UserActionCreators from './user'
import * as ArticlesCategoriesActionCreators from './articles-categories'
import * as LoadingActionCreators from './loading'
import * as CartActionCreators from './cart'

export default {
    ...UserActionCreators,
    ...ArticlesCategoriesActionCreators,
    ...LoadingActionCreators,
    ...CartActionCreators,
}