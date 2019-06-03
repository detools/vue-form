import { normalize, schema } from 'normalizr'

export default function getEntities(array, idAttribute = 'id') {
  const arraySchema = new schema.Entity('array', {}, { idAttribute })

  return normalize(array, [arraySchema]).entities.array
}
