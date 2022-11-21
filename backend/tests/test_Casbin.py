from common.casbin import enforcer

class TestCasbin:
  def test(self):
      print(enforcer.get_all_roles)
      # enforcer.get_implicit_permissions_for_user(1)

  # def test_add_rule(self):
  #     print(enforcer.add_named_policy())

  def test_verify(self):
      print(enforcer.enforce_ex("2429016435847252", "/v1/projects/<project_id>", "GET"))
