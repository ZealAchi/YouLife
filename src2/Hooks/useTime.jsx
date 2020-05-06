import { useEffect, useState, useMemo } from 'react'

function formatDate(date) {
    if (!date)
        return ''
    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const seconds = `0${date.getSeconds()}`.slice(-2)
    return `${hours}:${minutes}:${seconds}`
}

export function useTime() {

    const FunctionsTime = useMemo(() => {
        return {
            getDayName: () => {
                
                const [dia, setDia] = useState('')
                const DiasSemanaYouTrain = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
                useEffect(() => {
                    const now = new Date()
                    setDia(DiasSemanaYouTrain[now.getDay()])
                }, [])
                return dia
            },
            // ObtenerTiempoReal: () => {
            //     const [timeString, setTimeString] = useState('')
            //     useEffect(() => {
            //         const clockInterval = setInterval(() => {
            //             const now = new Date();
            //             //HH::mm:ss
            //             const newTimeString = formatDate(now)
            //             setTimeString(newTimeString)
            //         }, 1000)
            //         return () => {
            //             clearInterval(clockInterval)
            //         }
            //     }, [])
            // }
        }
    })

    return { FunctionsTime }
}