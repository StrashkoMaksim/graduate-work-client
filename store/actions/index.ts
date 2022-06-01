import * as UserActionCreators from './user'
import * as ArticlesCategoriesActionCreators from './articles-categories'
import * as LoadingActionCreators from './loading'

export default {
    ...UserActionCreators,
    ...ArticlesCategoriesActionCreators,
    ...LoadingActionCreators,
}