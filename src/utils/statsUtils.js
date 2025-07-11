import { CharacterManager, CurrentUserManager, UserManager } from './localStorage'

export const getUserStats = (email) => {
    const myCharacters = CharacterManager.getCharactersByUser(email)
    const recentCharacters = [...myCharacters]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    return {
        myCharactersCount: myCharacters.length,
        recentCharacters
    }
}

export const getAdminStats = () => {
    const allUsers = UserManager.getAllUsers()
    const allCharacters = CharacterManager.getAllCharacters()

    const countTop = (key) => {
        const count = allCharacters.reduce((acc, char) => {
            acc[char[key]] = (acc[char[key]] || 0) + 1
            return acc
        }, {})

        return Object.entries(count)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }))
    }

    const raceStats = countTop('race')
    const classStats = countTop('class')
    const featStats = countTop('feat')

    const userActivity = allCharacters.reduce((acc, char) => {
        acc[char.email] = (acc[char.email] || 0) + 1
        return acc
    }, {})

    const sortedUserActivity = Object.entries(userActivity)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([email, count]) => ({ email, count }))

    return {
        totalUsers: allUsers.length,
        totalCharacters: allCharacters.length,
        topRaces: raceStats,
        topClasses: classStats,
        topFeats: featStats,
        userActivity: sortedUserActivity
    }
}
