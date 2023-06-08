import React, {ChangeEvent} from 'react';
import {UsersSearchFilterType} from "../../../store/users/users-reducer";
import s from "./usersSearchPanel.module.css"
import reset from "../../../assets/imges/filter-remove-svgrepo-com.svg"

type PropsType = {
    searchValue: string
    filterIsFriend: null | boolean
    setSearchValue: (e: ChangeEvent<HTMLInputElement>) => void
    setSearchSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    clearInput: () => void
    findFilteredUserHandler: (filter: UsersSearchFilterType) => void
    selectStateValue: string
}

export const UsersSearchPanel: React.FC<PropsType> = ({
                                                          searchValue,
                                                          filterIsFriend,
                                                          setSearchValue,
                                                          setSearchSelect,
                                                          clearInput,
                                                          findFilteredUserHandler,
                                                          selectStateValue
                                                      }) => {
    const onClickHandler = () => {
        findFilteredUserHandler({term: searchValue, friend: filterIsFriend});
    }

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.searchInputWrapper}>
                    <input
                        type='search'
                        name='term'
                        value={searchValue}
                        onChange={setSearchValue}
                        className={s.searchInput}
                        placeholder={'Search users'}
                    />
                </div>
                <div className={s.searchSelect}>
                    <select name='friend'
                            value={selectStateValue}
                            onChange={setSearchSelect}
                    >
                        <option value={'null'}>All</option>
                        <option value={'true'}>Friend</option>
                        <option value={'false'}>Strangers</option>
                    </select>
                </div>
                <div>
                    <button onClick={onClickHandler} className={s.findButton}>
                        Search
                    </button>
                </div>
            </div>
            <label onClick={clearInput}>
                <div className={s.clearInput}>
                    <img src={reset} alt={"✖"}/>
                </div>
            </label>
        </div>
    );
};
