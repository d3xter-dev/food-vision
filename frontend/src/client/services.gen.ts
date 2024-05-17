// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type { AnalyzeData, AnalyzeResponse } from './types.gen'

export class DefaultService {
    /**
     * @param data The data for the request.
     * @param data.formData Image file to analyze
     * @returns AnalysisResultDto Analysis result
     * @throws ApiError
     */
    public static analyze(data: AnalyzeData): CancelablePromise<AnalyzeResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/analyze',
            formData: data.formData,
            mediaType: 'multipart/form-data',
        })
    }
}