package com.perfil.service;

import com.perfil.model.*;
import com.perfil.repository.PerfilRepository;
import com.perfil.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    public Usuario processarQuestionario(QuestionarioForm form) {
        System.out.println("=== INICIANDO PROCESSAMENTO ===");
        System.out.println("Nome: " + form.getNome());
        System.out.println("Email: " + form.getEmail());
        System.out.println("Nível recebido do frontend: " + form.getNivel());

        // Usar o nível enviado pelo frontend
        int nivel = form.getNivel() != null ? form.getNivel() : 1;
        System.out.println("Nível a ser usado: " + nivel);

        Perfil perfil = obterPerfilPorNivel(nivel);
        System.out.println("Perfil obtido: " + perfil.getNome());

        Usuario usuario = new Usuario(form.getNome(), form.getEmail(), perfil);
        System.out.println("Tentando salvar usuário...");

        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        System.out.println("Usuário salvo com ID: " + usuarioSalvo.getId());

        return usuarioSalvo;
    }

    private Perfil obterPerfilPorNivel(int nivel) {
        String nomePerfil;

        switch (nivel) {
            case 5: nomePerfil = "Investidor Antifrágil"; break;
            case 4: nomePerfil = "Sofisticado III"; break;
            case 3: nomePerfil = "Sofisticado II"; break;
            case 2: nomePerfil = "Sofisticado I"; break;
            default: nomePerfil = "Minimal"; break;
        }

        return perfilRepository.findByNome(nomePerfil)
                .orElseGet(() -> {
                    Perfil novoPerfil = new Perfil();
                    novoPerfil.setNome(nomePerfil);
                    novoPerfil.setNivel(nivel);
                    return perfilRepository.save(novoPerfil);
                });
    }

    public Map<String, Object> obterDetalhesPerfilPorNome(String nomePerfil) {
        Map<String, Object> detalhes = new HashMap<>();

        detalhes.put("nome", nomePerfil);
        detalhes.put("descricao", "Descrição do perfil " + nomePerfil);
        detalhes.put("caracteristicas", new String[]{
                "Característica 1",
                "Característica 2",
                "Característica 3"
        });

        return detalhes;
    }
}