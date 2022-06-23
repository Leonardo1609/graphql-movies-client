import { SchemaOf, ValidationError } from 'yup'
import { reactive, UnwrapNestedRefs } from 'vue'

export const useForm = <T extends {}>(
  initialValues: T,
  schema?: SchemaOf<T>
) => {
  const form = reactive({ ...initialValues })
  const errors = reactive({ ...initialValues })

  const resetErrors = () => {
    for (const key in errors as T) {
      ;(errors as T)[key as unknown as keyof T] =
        initialValues[key as unknown as keyof T]!
    }
  }

  const handleSumit = async (
    callBack: (
      data: UnwrapNestedRefs<T> | Awaited<SchemaOf<T, never>['__outputType']>
    ) => any
  ) => {
    try {
      if (schema) {
        const resp = await schema.validate(form, {
          abortEarly: false,
        })
        resetErrors()
        callBack(resp)
      }
      callBack(form)
    } catch (err) {
      if (err instanceof ValidationError) {
        resetErrors()
        err.inner.forEach((value) => {
          if (value.path) {
            ;(errors as any)[value.path] = value.message
          }
        })
      }
    }
  }

  return {
    values: form,
    errors,
    resetErrors,
    handleSumit,
  }
}
