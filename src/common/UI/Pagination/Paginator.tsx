import React, {useEffect, useState} from "react";
import styles from "./Paginator.module.css";
import {v1} from "uuid";

// позволяет писать классы стилей через запятую, добавлять логику
// import cn from 'classnames';
// className={cn(styles.myClassName1, myClassName2)}

export type PaginatorPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onChangePageHandler: (pageNumber: number) => void
    numberOfPagesInBlock: number
}

export const Paginator = (props: PaginatorPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    const [partOfPages, setPartOfPages] = useState<number>(1);
    const sizeOfPagesPartCount = Math.ceil(pagesCount / props.numberOfPagesInBlock);
    const prevPagePartNumber = (partOfPages - 1) * props.numberOfPagesInBlock + 1;
    const nextPagePartNumber = partOfPages * props.numberOfPagesInBlock;

    const prevPageHandler = () => {
        props.onChangePageHandler(props.currentPage - 1);
    }
    const nextPageHandler = () => {
        props.onChangePageHandler(props.currentPage + 1);
    }

    useEffect(() => {
        const currentBlock = Math.ceil(props.currentPage / props.numberOfPagesInBlock);
        setPartOfPages(currentBlock);
    }, [props.currentPage])

    return (
        <>
            <div className={styles.paginationWrapper}>

                <div className={styles.paginationButtonPrev}>
                    <button onClick={() => {
                        setPartOfPages(partOfPages - 1)
                    }}
                            disabled={prevPagePartNumber === 1}>
                        Пред.
                    </button>
                    <button onClick={prevPageHandler}
                            disabled={props.currentPage === 1}>
                        -1
                    </button>
                </div>

                <div className={styles.pagination}>
                    {
                        pages
                            .filter(page => page >= prevPagePartNumber && page <= nextPagePartNumber)
                            .map(page => {
                                return (
                                    <span className={props.currentPage === page ? styles.selectedPage : ''}
                                          key={v1()}
                                          onClick={() => {
                                              props.onChangePageHandler(page)
                                          }}
                                    >
                                  {page}
                            </span>
                                )
                            })
                    }
                </div>

                <div className={styles.paginationButtonNext}>
                    <button onClick={nextPageHandler}
                            disabled={props.currentPage === pagesCount}>
                        +1
                    </button>
                    <button onClick={() => {
                        setPartOfPages(partOfPages + 1)
                    }}
                            disabled={sizeOfPagesPartCount < partOfPages + 1} // ???
                    >
                        След.
                    </button>
                </div>

            </div>
        </>
    );
}