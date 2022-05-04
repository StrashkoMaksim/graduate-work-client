import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import MainPage from "../pages/main/MainPage/MainPage";
import MainLayout from "../components/MainLayout/MainLayout";

export const useRoutes = () => {
    const isAuth = useTypedSelector(state => state.user.isAuth)
    const { checkAuthUser } = useActions()

    useEffect(() => {
        checkAuthUser()
    }, [])

    return (
        <Routes>
            {/*{*/}
            {/*    isAuth ? (*/}
            {/*        <>*/}
            {/*            <Route path="/admin" element={<AdminLayout />}>*/}
            {/*                <Route index element={<AdminNewsPage />} />*/}
            {/*                <Route path="*" element={<AdminNewsPage />} />*/}
            {/*            </Route>*/}
            {/*        </>*/}
            {/*    ) : <Route path="/admin/*" element={<Login />} />*/}
            {/*}*/}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path="*" element={<MainPage />} />
            </Route>
        </Routes>
    )
}