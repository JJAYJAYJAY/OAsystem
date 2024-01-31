# API文档

## 简介

这是我们的API文档，包含了所有的API接口信息。

## API列表

### 登录

- URL: `/login`
- 方法: `POST`
- 请求参数:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| username | String | 用户名 |
| password | String | 密码 |

- 响应参数:

| 参数名      | 类型    | 描述    |
|----------|----|----|
| flag     | Bool  | 登录是否成功 |
| username | String | 用户名   |
| userId   | Int | 用户ID   |

- 请求示例:

```json
{
  "username": "test",
  "password": "test"
}