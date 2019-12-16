# 数据库设计 MySql

## user
    - account 账号
    - password 密码
    - avatar 头像
    - type 用户类型
  
 ## food 菜品
    - name 菜品名称
    - type 菜品类型
    - price 价格
    - details_picture 详情图片
    - recommendation_level 推荐等级
    - monthly_sales_volume 月销量
    - tags 标签
    - describe 描述
    - information 额外信息

## order 
    - user_id 用户ID
    - status 状态(待支付|已取消|已支付)
    - packing_cost 打包费用
    - price_total 总价
    - table_num 桌号
    - order_start_time 下单时间
    - order_cancel_time 取消时间
    - order_pay_time 支付时间

## order_food 订单菜品
    - order_id
    - food_id
    - food_name
    - price_cost

## remark 评论
    - order_id 
    - service_state 服务状态
    - content 内容
    - picture 图片
    - order_start_time 评价时间
