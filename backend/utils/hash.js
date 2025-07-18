import argon2 from 'argon2'

export async function createHash(password) {
  return await argon2.hash(password)
}

export async function validatePassword(hash, candidate) {
  return await argon2.verify(hash, candidate)
}
