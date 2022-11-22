/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : FRFC

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 15/11/2022 14:24:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for b_cash_extract
-- ----------------------------
DROP TABLE IF EXISTS `b_cash_extract`;
CREATE TABLE `b_cash_extract`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `flow_id` int(0) NULL DEFAULT NULL COMMENT '流水ID[日期+当天提现位数]',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '用户id',
  `finance_user_id` int(0) NULL DEFAULT NULL COMMENT '财务用户id',
  `status` int(0) NULL DEFAULT NULL COMMENT '0默认未审核,1通过,2驳回',
  `cash` int(0) NULL DEFAULT NULL COMMENT '提现金额',
  `account` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款账号',
  `audit_time` int(0) NULL DEFAULT NULL,
  `create_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_cash_extract_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_cash_extract
-- ----------------------------

-- ----------------------------
-- Table structure for b_feedback
-- ----------------------------
DROP TABLE IF EXISTS `b_feedback`;
CREATE TABLE `b_feedback`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '反馈人',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `create_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_feedback_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_feedback
-- ----------------------------

-- ----------------------------
-- Table structure for b_message
-- ----------------------------
DROP TABLE IF EXISTS `b_message`;
CREATE TABLE `b_message`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '消息类型: notification|message|event',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '描述',
  `read` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `extra` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Event类型的额外信息',
  `status` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Event类型的状态信息',
  `create_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_message_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_message
-- ----------------------------

-- ----------------------------
-- Table structure for b_project
-- ----------------------------
DROP TABLE IF EXISTS `b_project`;
CREATE TABLE `b_project`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NULL DEFAULT NULL COMMENT '发布者id',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目名',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '项目描述',
  `req` int(0) NULL DEFAULT NULL COMMENT '项目难度要求1-5',
  `hour` int(0) NULL DEFAULT NULL COMMENT '工作周期',
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户上传的图片',
  `lib_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '任务附件链接',
  `status` int(0) NULL DEFAULT NULL COMMENT '1投标中2.选标3工作中4审核中5完成',
  `tender_time` int(0) NULL DEFAULT NULL COMMENT '投标截至时间',
  `result_time` int(0) NULL DEFAULT NULL COMMENT '出标时间',
  `result_user_id` int(0) NULL DEFAULT NULL COMMENT '中标用户id',
  `create_user_id` int(0) NULL DEFAULT NULL COMMENT '创建项目用户id',
  `upload_limit` int(0) NULL DEFAULT NULL COMMENT '作品上传限制次数,默认3到达三次不允许上传',
  `create_time` int(0) NULL DEFAULT NULL,
  `update_time` int(0) NULL DEFAULT NULL,
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_project_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_project
-- ----------------------------
INSERT INTO `b_project` VALUES (1, 1, '厕所', '大幅度反对法', 1, 123, '', '', 2, 1657876415, 1657876415, NULL, NULL, 3, 1657876524, 1658210834, 1);
INSERT INTO `b_project` VALUES (2, 2, '厕所2', '2', 1, 1, '1', '1', 1, 1657876415, 1657876415, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `b_project` VALUES (3, 1, 'string', 'string', 0, 0, 'string', 'string', 3, 0, 0, NULL, NULL, 3, 1658136752, 1658136752, 0);
INSERT INTO `b_project` VALUES (5, 1, 'string', 'string', 0, 0, 'string', 'string', 3, 0, 0, NULL, NULL, 3, 1658198283, 1658198283, 0);
INSERT INTO `b_project` VALUES (7, 1, 'string休息休息', 'string', 0, 0, 'string', 'string', 3, 0, 0, NULL, NULL, 3, 1658198422, 1658198422, 0);
INSERT INTO `b_project` VALUES (10, 1, 'string休息休息123', 'string', 5, 20, 'string', 'string', 4, 0, 1657416600, 1, NULL, 3, 1658199036, 1658377797, 0);
INSERT INTO `b_project` VALUES (11, 1, '不要动画', NULL, 5, 20, NULL, NULL, 4, NULL, 1657416600, 1, NULL, 3, 1658201515, 1658377533, 1);
INSERT INTO `b_project` VALUES (12, 1, 'string', 'string', 0, 0, 'string', 'string', 2, 0, 1657416600, 1, NULL, 3, 1658202451, 1658313000, 0);
INSERT INTO `b_project` VALUES (13, 1, '修改名称', NULL, NULL, NULL, NULL, NULL, 4, NULL, 1657416600, 1, NULL, 3, 1658202468, 1658374396, 0);
INSERT INTO `b_project` VALUES (14, 1, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, 3, 1658202532, 1658210804, 1);

-- ----------------------------
-- Table structure for b_project_tag
-- ----------------------------
DROP TABLE IF EXISTS `b_project_tag`;
CREATE TABLE `b_project_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `project_id` int(0) NULL DEFAULT NULL COMMENT '项目id',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签名',
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_project_tag_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_project_tag
-- ----------------------------
INSERT INTO `b_project_tag` VALUES (3, 14, 'good', 0);
INSERT INTO `b_project_tag` VALUES (4, 11, 'rdas', 1);

-- ----------------------------
-- Table structure for b_project_tender
-- ----------------------------
DROP TABLE IF EXISTS `b_project_tender`;
CREATE TABLE `b_project_tender`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `project_id` int(0) NULL DEFAULT NULL COMMENT '投标项目id',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '投标用户id',
  `status` int(0) NULL DEFAULT NULL COMMENT '0默认,1待定,2通过',
  `create_time` int(0) NULL DEFAULT NULL,
  `update_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_project_tender_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_project_tender
-- ----------------------------
INSERT INTO `b_project_tender` VALUES (8, 1, 1, 0, 1658224175, 1658224175);
INSERT INTO `b_project_tender` VALUES (9, 14, 1, 2, 1658224292, 1658225506);

-- ----------------------------
-- Table structure for b_project_work
-- ----------------------------
DROP TABLE IF EXISTS `b_project_work`;
CREATE TABLE `b_project_work`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `project_id` int(0) NULL DEFAULT NULL COMMENT '投标项目id',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '投标用户id',
  `status` int(0) NULL DEFAULT NULL COMMENT '0默认未审核,1通过,2驳回',
  `work_use_time` int(0) NULL DEFAULT NULL COMMENT '工作消耗时间(s)',
  `work_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '作品内容',
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '驳回理由',
  `score` int(0) NULL DEFAULT NULL COMMENT '作品评分',
  `audit_time` int(0) NULL DEFAULT NULL,
  `create_time` int(0) NULL DEFAULT NULL,
  `update_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_b_project_work_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_project_work
-- ----------------------------
INSERT INTO `b_project_work` VALUES (1, 12, 1, 2, 333593, 'string', 'string', NULL, 1658312999, 1658290193, 1658313000);
INSERT INTO `b_project_work` VALUES (4, 13, 1, 2, 363571, 'xxxxx', NULL, 5, 1658374396, 1658374171, 1658374396);
INSERT INTO `b_project_work` VALUES (5, 11, 1, 2, 365319, 'string', NULL, 3, 1658377532, 1658375919, 1658377533);
INSERT INTO `b_project_work` VALUES (6, 10, 1, 2, 367174, 'string', NULL, 3, 1658377797, 1658377774, 1658377797);

-- ----------------------------
-- Table structure for base_api_store
-- ----------------------------
DROP TABLE IF EXISTS `base_api_store`;
CREATE TABLE `base_api_store`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '接口路径',
  `group` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所属组',
  `brief` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '接口描述',
  `request_method` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '请求方法',
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 140 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_api_store
-- ----------------------------
INSERT INTO `base_api_store` VALUES (1, '/user/login', '用户管理', '用户登录认证', 'POST', 0);
INSERT INTO `base_api_store` VALUES (2, '/user/current', '用户管理', '获取当前用户信息', 'GET', 0);
INSERT INTO `base_api_store` VALUES (3, '/user/roles', '用户管理', '更新用户角色', 'PUT', 0);
INSERT INTO `base_api_store` VALUES (4, '/user/block', '用户管理', '封禁用户', 'POST', 0);
INSERT INTO `base_api_store` VALUES (5, '/user/unblock', '用户管理', '解封用户', 'POST', 0);
INSERT INTO `base_api_store` VALUES (6, '/user/list', '用户管理', '获取用户列表', 'GET', 0);
INSERT INTO `base_api_store` VALUES (7, '/user/{id}', '用户管理', '获取指定用户', 'GET', 0);
INSERT INTO `base_api_store` VALUES (8, '/role/', '角色管理', '获取角色列表', 'GET', 0);
INSERT INTO `base_api_store` VALUES (9, '/apis/all', 'API管理', '获取所有API', 'GET', 0);
INSERT INTO `base_api_store` VALUES (10, '/apis/role/authorized', 'API管理', '获取角色已授权API', 'GET', 0);
INSERT INTO `base_api_store` VALUES (11, '/apis/permission', 'API管理', '更新角色API权限', 'PUT', 0);
INSERT INTO `base_api_store` VALUES (12, '/menu/all', '菜单管理', '获取所有菜单', 'GET', 0);
INSERT INTO `base_api_store` VALUES (13, '/menu/role/authorized', '菜单管理', '获取角色已授权菜单', 'GET', 0);
INSERT INTO `base_api_store` VALUES (14, '/menu/user/authorized', '菜单管理', '获取用户已授权菜单', 'GET', 0);
INSERT INTO `base_api_store` VALUES (15, '/menu/permission', '菜单管理', '更新角色授权菜单', 'PUT', 0);

-- ----------------------------
-- Table structure for base_menu_store
-- ----------------------------
DROP TABLE IF EXISTS `base_menu_store`;
CREATE TABLE `base_menu_store`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `pid` int(0) NULL DEFAULT NULL COMMENT '父id',
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `en_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` int(0) NULL DEFAULT NULL,
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_menu_store
-- ----------------------------
INSERT INTO `base_menu_store` VALUES (1, 0, '项目管理', NULL, 'container', '/project', 1, 0);
INSERT INTO `base_menu_store` VALUES (2, 1, '项目列表', NULL, 'container', '/project/list', 2, 0);
INSERT INTO `base_menu_store` VALUES (3, 0, '财务管理', NULL, 'container', '/finance', 3, 0);
INSERT INTO `base_menu_store` VALUES (4, 3, '费用明细', NULL, 'container', '/finance/fee', 4, 0);
INSERT INTO `base_menu_store` VALUES (5, 0, '合同管理', NULL, 'container', '/contract', 5, 0);
INSERT INTO `base_menu_store` VALUES (6, 5, '销售合同', NULL, 'container', '/contract/sale/list', 6, 0);
INSERT INTO `base_menu_store` VALUES (7, 5, '付款合同', NULL, 'tool', '/contract/pay/list', 7, 0);
INSERT INTO `base_menu_store` VALUES (8, 0, '数据看板', NULL, 'tool', '/data', 8, 0);
INSERT INTO `base_menu_store` VALUES (9, 8, '工时看板', NULL, 'tool', '/data/hours', 9, 0);
INSERT INTO `base_menu_store` VALUES (10, 0, '后台管理', NULL, 'tool', '/manage', 10, 0);
INSERT INTO `base_menu_store` VALUES (11, 10, '用户管理', NULL, 'tool', '/manage/user', 11, 0);
INSERT INTO `base_menu_store` VALUES (12, 10, '角色管理', NULL, 'tool', '/manage/role', 12, 0);

-- ----------------------------
-- Table structure for base_role_api_permission
-- ----------------------------
DROP TABLE IF EXISTS `base_role_api_permission`;
CREATE TABLE `base_role_api_permission`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NULL DEFAULT NULL,
  `api_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_role_api_permission
-- ----------------------------
INSERT INTO `base_role_api_permission` VALUES (13, 1, 109);
INSERT INTO `base_role_api_permission` VALUES (14, 1, 50);
INSERT INTO `base_role_api_permission` VALUES (15, 1, 102);
INSERT INTO `base_role_api_permission` VALUES (16, 1, 103);
INSERT INTO `base_role_api_permission` VALUES (17, 1, 104);
INSERT INTO `base_role_api_permission` VALUES (18, 1, 105);
INSERT INTO `base_role_api_permission` VALUES (19, 1, 106);
INSERT INTO `base_role_api_permission` VALUES (20, 1, 107);
INSERT INTO `base_role_api_permission` VALUES (21, 3, 1);
INSERT INTO `base_role_api_permission` VALUES (22, 3, 2);
INSERT INTO `base_role_api_permission` VALUES (23, 3, 3);
INSERT INTO `base_role_api_permission` VALUES (24, 3, 4);
INSERT INTO `base_role_api_permission` VALUES (25, 3, 5);
INSERT INTO `base_role_api_permission` VALUES (26, 3, 100);
INSERT INTO `base_role_api_permission` VALUES (27, 3, 101);
INSERT INTO `base_role_api_permission` VALUES (28, 3, 50);
INSERT INTO `base_role_api_permission` VALUES (29, 3, 102);
INSERT INTO `base_role_api_permission` VALUES (30, 3, 103);
INSERT INTO `base_role_api_permission` VALUES (31, 3, 104);
INSERT INTO `base_role_api_permission` VALUES (32, 3, 105);
INSERT INTO `base_role_api_permission` VALUES (33, 3, 106);
INSERT INTO `base_role_api_permission` VALUES (34, 3, 107);
INSERT INTO `base_role_api_permission` VALUES (35, 3, 109);
INSERT INTO `base_role_api_permission` VALUES (36, 3, 52);
INSERT INTO `base_role_api_permission` VALUES (37, 3, 108);
INSERT INTO `base_role_api_permission` VALUES (38, 3, 55);
INSERT INTO `base_role_api_permission` VALUES (39, 3, 56);
INSERT INTO `base_role_api_permission` VALUES (40, 3, 57);
INSERT INTO `base_role_api_permission` VALUES (41, 3, 58);

-- ----------------------------
-- Table structure for base_role_dict
-- ----------------------------
DROP TABLE IF EXISTS `base_role_dict`;
CREATE TABLE `base_role_dict`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_delete` tinyint(1) NULL DEFAULT 0,
  `sort_order` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_role_dict
-- ----------------------------
INSERT INTO `base_role_dict` VALUES (1, '平台用户', 'user', 0, NULL);
INSERT INTO `base_role_dict` VALUES (2, '运营人员', 'operating', 0, NULL);
INSERT INTO `base_role_dict` VALUES (3, '财务人员', 'accountant', 0, NULL);
INSERT INTO `base_role_dict` VALUES (4, 'ROOT', 'root', 0, NULL);

-- ----------------------------
-- Table structure for base_role_menu_permission
-- ----------------------------
DROP TABLE IF EXISTS `base_role_menu_permission`;
CREATE TABLE `base_role_menu_permission`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NULL DEFAULT NULL,
  `menu_id` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_role_menu_permission
-- ----------------------------
INSERT INTO `base_role_menu_permission` VALUES (13, 2, 12);
INSERT INTO `base_role_menu_permission` VALUES (14, 2, 11);
INSERT INTO `base_role_menu_permission` VALUES (20, 1, 11);
INSERT INTO `base_role_menu_permission` VALUES (21, 1, 12);
INSERT INTO `base_role_menu_permission` VALUES (22, 1, 10);
INSERT INTO `base_role_menu_permission` VALUES (23, 1, 1);
INSERT INTO `base_role_menu_permission` VALUES (24, 1, 2);
INSERT INTO `base_role_menu_permission` VALUES (25, 1, 3);
INSERT INTO `base_role_menu_permission` VALUES (26, 1, 4);
INSERT INTO `base_role_menu_permission` VALUES (27, 1, 5);
INSERT INTO `base_role_menu_permission` VALUES (28, 1, 6);
INSERT INTO `base_role_menu_permission` VALUES (29, 1, 7);
INSERT INTO `base_role_menu_permission` VALUES (30, 1, 8);
INSERT INTO `base_role_menu_permission` VALUES (31, 1, 9);

-- ----------------------------
-- Table structure for base_user
-- ----------------------------
DROP TABLE IF EXISTS `base_user`;
CREATE TABLE `base_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `school` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学校',
  `phone` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `wechat` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信号',
  `real_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `id_card` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证',
  `pay_account` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款账号',
  `cash` float NULL DEFAULT NULL COMMENT '账户可用余额',
  `cash_extract` float NULL DEFAULT NULL COMMENT '用户在提现金额',
  `coin` int(0) NULL DEFAULT NULL COMMENT '账户积分',
  `is_block` tinyint(1) NULL DEFAULT NULL,
  `create_time` int(0) NULL DEFAULT NULL,
  `update_time` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  INDEX `ix_base_user_id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_user
-- ----------------------------
INSERT INTO `base_user` VALUES (1, '老马', '$1$j/UD0jZD$5P4iZQxt8ANhXfWN0X9fN1', 'jksdf@qq.com', '北京大学', '13412341234', 'gooddjii', '马云', '440123111122214211', 'sadfjk@qq.com', 8100, 0, 32000, 0, NULL, 1658377797);
INSERT INTO `base_user` VALUES (2, '老王', '$1$j/UD0jZD$5P4iZQxt8ANhXfWN0X9fN1', 'urjkwle@qq.cc', '清华的大学', '13412312312', 'gdfge', '王鹤云', '440129839012839', 'j123091@164.cn', 0, 0, 0, 0, NULL, NULL);

-- ----------------------------
-- Table structure for base_user_role_rel
-- ----------------------------
DROP TABLE IF EXISTS `base_user_role_rel`;
CREATE TABLE `base_user_role_rel`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `is_delete` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 224 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_user_role_rel
-- ----------------------------
INSERT INTO `base_user_role_rel` VALUES (205, 1, 2, 0);
INSERT INTO `base_user_role_rel` VALUES (223, 1, 1, 0);
INSERT INTO `base_user_role_rel` VALUES (224, 4, 1, 0);

-- ----------------------------
-- Table structure for casbin_rule
-- ----------------------------
DROP TABLE IF EXISTS `casbin_rule`;
CREATE TABLE `casbin_rule`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ptype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v0` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `v5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22279 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of casbin_rule
-- ----------------------------
INSERT INTO `casbin_rule` VALUES (22230, 'g', '2', 'guest', NULL, NULL, NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22243, 'p', 'guest', '/v1/customers', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22244, 'p', 'guest', '/v1/users', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22245, 'p', 'guest', '/v1/users/list', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22246, 'p', 'guest', '/v1/users/role', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22247, 'p', 'guest', '/v1/users/del', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22248, 'p', 'guest', '/v1/users/block', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22249, 'p', 'guest', '/v1/users/unblock', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22250, 'p', 'guest', '/user/{id}', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22251, 'p', 'department-user', '/v1/auth/apis/all', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22252, 'p', 'department-user', '/v1/auth/apis/authorized', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22253, 'p', 'department-user', '/v1/auth/apis/permission', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22254, 'p', 'department-user', '/v1/osscallback', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22255, 'p', 'department-user', '/v1/getosstoken', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22256, 'p', 'department-user', '/v1/customers', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22257, 'p', 'department-user', '/v1/dict/projects/roles', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22258, 'p', 'department-user', '/v1/auth/menus/list', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22259, 'p', 'department-user', '/v1/auth/menus/role/authorized', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22260, 'p', 'department-user', '/v1/auth/menus/user/authorized', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22261, 'p', 'department-user', '/v1/auth/menus/permission', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22262, 'p', 'department-user', '/v1/records', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22263, 'p', 'department-user', '/v1/role/list', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22264, 'p', 'department-user', '/v1/users', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22265, 'p', 'department-user', '/v1/users/list', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22266, 'p', 'department-user', '/v1/users/role', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22267, 'p', 'department-user', '/v1/users/del', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22268, 'p', 'department-user', '/v1/users/block', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22269, 'p', 'department-user', '/v1/users/unblock', 'POST', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22270, 'p', 'department-user', '/v1/projects/workinghours', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22271, 'p', 'department-user', '/user/{id}', 'GET', 'true', NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22278, 'g', '1', 'user', NULL, NULL, NULL, NULL);
INSERT INTO `casbin_rule` VALUES (22279, 'g', '1', 'root', NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
