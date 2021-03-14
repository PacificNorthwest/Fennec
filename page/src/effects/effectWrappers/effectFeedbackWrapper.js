export function wrapFeedback(effect, feedback) {
    if (feedback) {
        return (...args) => {
            try {
                const effectResult = effect.apply(this, args);
                if (effectResult instanceof Promise) {
                    return effectResult
                        .then(() => feedback.success)
                        .catch(() => Promise.reject(feedback.error))
                } else {
                    return feedback.success;
                }
            } catch {
                throw new Error(feedback.error);
            }
        }
    } else {
        return effect;
    }
}