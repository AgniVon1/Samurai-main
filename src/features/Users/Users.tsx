import React, {ChangeEvent, useEffect, useState} from 'react';

import {useSearchParams} from "react-router-dom";
import {Paginator} from "../../common/UI/Pagination/Paginator";
import {useAppSelector} from "../../store/hooks/useAppSelector";
import {selectCurrentPage, selectFilter, selectPageSize, selectTotalCount} from "../../store/users/user-selectors";
import {useAppDispatch} from "../../store/hooks/useAppDispatch";
import {getUsers, setFilter, UsersSearchFilterType} from "../../store/users/users-reducer";
import {UsersList} from "./UsersList/UsersList";
import {UsersSearchPanel} from "./UsersSearchPanel/UsersSearchPanel";
import {useAuthRedirect} from "../../common/hooks/useAuthRedirect";


export const Users: React.FC = () => {
    const dispatch = useAppDispatch()

    useAuthRedirect()

    const totalCount = useAppSelector(selectTotalCount)
    const currentPage = useAppSelector(selectCurrentPage)
    const pageSize = useAppSelector(selectPageSize)
    const filter = useAppSelector(selectFilter)

    const [searchParams, setSearchParams] = useSearchParams();
    let pageQuery = searchParams.get('page') || 1;
    let termQuery = searchParams.get('term') || '';
    let friendQuery = searchParams.get('friend') || 'null';

    const [selectedValue, setSelectValue] = useState<any>(friendQuery);

    const pageHandler = (page: number) => {
        dispatch(getUsers(page, pageSize, filter));
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    }

    const onChangeSearchInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({term: e.currentTarget.value, friend: filter.friend}));
    }

    const onChangeSearchSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const friendQuery = e.currentTarget.value
        dispatch(setFilter({
            term: filter.term,
            friend: (friendQuery === 'null') ? null : (friendQuery === 'true')
        }));
        setSelectValue(friendQuery);
    }

    const clearInput = () => {
        setSelectValue('null');
        setSearchParams('');
        dispatch(setFilter({term: '', friend: null}));
        dispatch(getUsers(1, pageSize, {term: '', friend: null}));
    }

    const findFilteredUserHandler = (filter: UsersSearchFilterType) => {
        searchParams.set('page', '1');
        dispatch(getUsers(1, pageSize, {term: filter.term, friend: filter.friend}));
        if (filter.term !== '') {
            searchParams.set('term', filter.term);
        } else {
            searchParams.delete('term');
        }
        searchParams.set('friend', filter.friend === null ? 'null' : filter.friend ? 'true' : 'false');
        setSearchParams(searchParams);
    }

    useEffect(() => {
        dispatch(getUsers(Number(pageQuery), pageSize, {
            term: termQuery,
            friend: (friendQuery === 'null') ? null : (friendQuery === 'true')
        }))
    }, [])

    return (<>
            <UsersSearchPanel
                searchValue={filter.term}
                filterIsFriend={filter.friend}
                setSearchValue={onChangeSearchInputValue}
                setSearchSelect={onChangeSearchSelectValue}
                clearInput={clearInput}
                findFilteredUserHandler={findFilteredUserHandler}
                selectStateValue={selectedValue}/>
            <UsersList/>
            <Paginator pageSize={pageSize} totalUsersCount={totalCount} currentPage={currentPage}
                       onChangePageHandler={pageHandler} numberOfPagesInBlock={15}/>
        </>

    );
};

