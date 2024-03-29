import {FC} from "react";
import {Article} from "../../../types/article";
import H1 from "../../../ui-kit/H1/H1";
import styles from './ArticleDetail.module.scss'
import cn from "classnames";
import ArticleSubline from "../ArticleSubline/ArticleSubline";
import H2 from "../../../ui-kit/H2/H2";

interface ArticleDetailProps {
    article: Article
}

const ArticleDetail: FC<ArticleDetailProps> = ({ article }) => {
    return (
        <article className={styles.article}>
            <H1 text={article.name} className={styles.h1} />
            {article.content.map(block => {
                switch (block.type) {
                    case 'paragraph':
                        return <p className={styles.paragraph} key={block.id}>{block.data.text}</p>
                    case 'list':
                        if (block.data.style === 'ordered') {
                            return (
                                <ol className={cn(styles.list, styles.ol)} key={block.id}>
                                    {block.data.items.map((item: string, index: number) =>
                                        <li className={styles.li} key={index}>{item}</li>
                                    )}
                                </ol>
                            )
                        } else {
                            return (
                                <ul className={cn(styles.list, styles.ul)} key={block.id}>
                                    {block.data.items.map((item: string, index: number) =>
                                        <li className={styles.li} key={index}>{item}</li>
                                    )}
                                </ul>
                            )
                        }
                    case 'image':
                        return <img src={block.data.file.url} alt={block.data.caption} className={styles.img} key={block.id} />
                    case 'carousel':
                        return <div className={styles.carousel} key={block.id}>
                            {block.data.map((img: {caption: string, url: string}) =>
                                <div className={styles.carouselImg} key={img.url}>
                                    <img src={img.url} alt={img.caption} />
                                </div>
                            )}
                        </div>
                    case 'header':
                        if (block.data.level === 2) {
                            return <H2 text={block.data.text} className={styles.h2} key={block.id} />
                        } else {
                            return <h3 className={styles.h3} key={block.id}>{block.data.text}</h3>
                        }
                    case 'delimiter':
                        return <div className={styles.hr} key={block.id} />
                    case 'warning':
                        return <ArticleSubline type="warning" title={block.data.title} text={block.data.message} key={block.id} />
                    case 'danger':
                        return <ArticleSubline type="danger" title={block.data.title} text={block.data.message} key={block.id} />
                    case 'embed':
                        return <iframe className={styles.iframe} src={block.data.embed} frameBorder="0" key={block.id}
                                allow="encrypted-media; picture-in-picture"
                                allowFullScreen
                        />
                    case 'table':
                        return <div className={styles.table} key={block.id}>
                            <table>
                                {block.data.withHeadings ?
                                    <thead>
                                        <tr>
                                            {block.data.content[0].map((cell: string, index: number) =>
                                                <th key={index}>{cell}</th>
                                            )}
                                        </tr>
                                    </thead> : ''
                                }
                                <tbody>
                                {block.data.content.map((row: string[], index: number) => {
                                    if (index === 0 && block.data.withHeadings) return;
                                    return <tr key={index}>
                                        {row.map((cell: string, index) =>
                                            <td key={index}>{cell}</td>
                                        )}
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                }
            })}
        </article>
    );
};

export default ArticleDetail;